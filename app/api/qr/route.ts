import { NextResponse } from 'next/server';

const EVOLUTION_TIMEOUT_MS = 10000;

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = EVOLUTION_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  try {
    const evUrl = process.env.EVOLUTION_API_URL;
    const evKey = process.env.EVOLUTION_API_KEY;
    const instanceName = 'Qpicanha';

    if (!evUrl || !evKey) {
      return NextResponse.json(
        { error: 'Evolution API não configurada' },
        { status: 500 }
      );
    }

    const res = await fetchWithTimeout(`${evUrl}/instance/connect/${instanceName}`, {
      method: 'GET',
      headers: { 'apikey': evKey },
    });

    const data = await res.json();

    if (data?.instance?.state === 'open') {
      return NextResponse.json({
        status: 'connected',
        message: 'WhatsApp conectado com sucesso!'
      });
    }

    if (data?.base64) {
      return NextResponse.json({
        status: 'qr_ready',
        qr: data.base64,
        message: 'Escaneie o código QR com a câmera do WhatsApp'
      });
    }

    return NextResponse.json({
      status: data?.instance?.state || 'disconnected',
      message: 'Aguardando QR code...'
    });
  } catch (error: any) {
    console.error('[qr] Erro:', error);
    return NextResponse.json(
      {
        error: error.message || 'Erro ao buscar QR code',
        status: 'error'
      },
      { status: 500 }
    );
  }
}
