'use client';

import { useEffect, useState } from 'react';

interface QRResponse {
  status: 'qr_ready' | 'connected' | 'disconnected' | 'error';
  qr?: string;
  message?: string;
  error?: string;
}

export default function QpicanhConnectPage() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'qr_ready' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('Carregando QR Code...');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await fetch('/api/qr');
        const data: QRResponse = await res.json();

        if (data.status === 'connected') {
          setStatus('connected');
          setMessage('✓ WhatsApp conectado com sucesso!');
          setQrCode(null);
          return;
        }

        if (data.status === 'qr_ready' && data.qr) {
          setStatus('qr_ready');
          setMessage(data.message || 'Escaneie o código QR com a câmera do WhatsApp');
          setQrCode(data.qr);
          setRefreshCount(r => r + 1);
          return;
        }

        if (data.error) {
          setStatus('error');
          setMessage(`Erro: ${data.error}`);
          setQrCode(null);
          return;
        }

        setStatus('error');
        setMessage('Não foi possível carregar o QR Code. Tente novamente.');
      } catch (error) {
        console.error('Erro ao buscar QR:', error);
        setStatus('error');
        setMessage('Erro de conexão. Verifique sua internet.');
      }
    };

    fetchQR();
    const interval = setInterval(fetchQR, 25000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6">
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none" />
      <div className="noise-overlay" />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Conectar WhatsApp
          </h1>
          <p className="text-slate-400 mb-8">
            Instância: <span className="text-primary font-semibold">Qpicanha</span>
          </p>

          {status === 'qr_ready' && qrCode ? (
            <div className="mb-8">
              <div className="bg-white p-4 rounded-lg inline-block animate-glow">
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  className="w-64 h-64"
                />
              </div>
              <p className="text-slate-300 mt-6 text-sm">{message}</p>
              <p className="text-slate-500 text-xs mt-3">
                QR Code atualizado {refreshCount > 0 ? `${refreshCount} vezes` : 'automaticamente'}
              </p>
            </div>
          ) : status === 'connected' ? (
            <div className="mb-8 py-12">
              <div className="text-6xl mb-4">✓</div>
              <p className="text-lg text-emerald-400 font-semibold">{message}</p>
              <p className="text-slate-400 text-sm mt-4">
                Você já pode começar a usar o Prospecto!
              </p>
            </div>
          ) : status === 'loading' ? (
            <div className="mb-8 py-12">
              <div className="inline-block">
                <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <p className="text-slate-300 mt-6">{message}</p>
            </div>
          ) : (
            <div className="mb-8 py-12">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-400 font-semibold">{message}</p>
              <button
                onClick={() => {
                  setStatus('loading');
                  setMessage('Carregando QR Code...');
                  fetch('/api/qr')
                    .then(r => r.json())
                    .then(data => {
                      if (data.status === 'qr_ready' && data.qr) {
                        setStatus('qr_ready');
                        setQrCode(data.qr);
                        setMessage(data.message || 'Escaneie o código QR');
                      } else if (data.status === 'connected') {
                        setStatus('connected');
                        setMessage('✓ WhatsApp conectado!');
                      } else {
                        setStatus('error');
                        setMessage(data.error || 'Erro desconhecido');
                      }
                    });
                }}
                className="mt-6 px-6 py-2 bg-primary text-black rounded-lg font-semibold hover:opacity-90 transition"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500 mb-3">
              O código QR é atualizado automaticamente a cada 25 segundos
            </p>
            <a
              href="https://prospecto.app"
              className="inline-block px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-sm text-slate-300 transition"
            >
              Voltar para Prospecto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
