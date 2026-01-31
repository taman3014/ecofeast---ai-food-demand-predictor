import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, X, Loader2 } from 'lucide-react';

interface VoiceCommandProps {
    onCommand: (command: string, action: string, data?: any) => void;
    isListening?: boolean;
}

// Define command patterns
const COMMAND_PATTERNS = [
    { pattern: /log (\d+) (.+) prepared.* (\d+) sold/i, action: 'LOG_ENTRY' },
    { pattern: /show (?:me )?(.+)/i, action: 'NAVIGATE' },
    { pattern: /what(?:'s| is) (?:the )?(.+)/i, action: 'QUERY' },
    { pattern: /run (?:the )?forecast/i, action: 'RUN_FORECAST' },
    { pattern: /help/i, action: 'HELP' },
];

const VoiceCommand: React.FC<VoiceCommandProps> = ({ onCommand }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        // Check if Web Speech API is supported
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setIsSupported(false);
        }
    }, []);

    const processCommand = useCallback((text: string) => {
        const lowerText = text.toLowerCase().trim();

        // Check for navigation commands
        if (lowerText.includes('dashboard')) {
            onCommand(text, 'NAVIGATE', { page: 'dashboard' });
            setFeedback('📊 Navigating to Dashboard');
            return;
        }
        if (lowerText.includes('forecast') && !lowerText.includes('run')) {
            onCommand(text, 'NAVIGATE', { page: 'forecaster' });
            setFeedback('🔮 Navigating to AI Forecast');
            return;
        }
        if (lowerText.includes('analytics')) {
            onCommand(text, 'NAVIGATE', { page: 'analytics' });
            setFeedback('📈 Navigating to Analytics');
            return;
        }
        if (lowerText.includes('history')) {
            onCommand(text, 'NAVIGATE', { page: 'history' });
            setFeedback('📋 Navigating to History');
            return;
        }

        // Run forecast command
        if (lowerText.includes('run') && lowerText.includes('forecast')) {
            onCommand(text, 'RUN_FORECAST', {});
            setFeedback('🚀 Running AI Forecast...');
            return;
        }

        // Log entry command
        const logMatch = lowerText.match(/log (\d+) (.+?) prepared.* (\d+) sold/i);
        if (logMatch) {
            onCommand(text, 'LOG_ENTRY', {
                prepared: parseInt(logMatch[1]),
                item: logMatch[2],
                sold: parseInt(logMatch[3])
            });
            setFeedback(`✅ Logged: ${logMatch[1]} ${logMatch[2]} prepared, ${logMatch[3]} sold`);
            return;
        }

        // Help command
        if (lowerText.includes('help')) {
            setFeedback('🎤 Try: "Show dashboard", "Run forecast", "Log 50 burgers prepared 45 sold"');
            onCommand(text, 'HELP', {});
            return;
        }

        // If no pattern matched, send to AI chat
        onCommand(text, 'CHAT_QUERY', { message: text });
        setFeedback('💬 Sending to AI assistant...');
    }, [onCommand]);

    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
            setFeedback('🎤 Listening...');
        };

        recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const text = result[0].transcript;
            setTranscript(text);

            if (result.isFinal) {
                processCommand(text);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setFeedback('❌ Error: ' + event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    if (!isSupported) {
        return null; // Don't show if not supported
    }

    return (
        <>
            {/* Floating Voice Button */}
            <button
                onClick={() => setShowPanel(!showPanel)}
                className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all ${isListening
                        ? 'bg-red-500 animate-pulse shadow-red-500/30'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 shadow-purple-500/30'
                    }`}
            >
                <Mic size={24} className="text-white" />
            </button>

            {/* Voice Command Panel */}
            {showPanel && (
                <div className="fixed bottom-24 left-6 z-50 w-80 bg-dark-secondary rounded-2xl shadow-2xl border border-border-muted overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Volume2 size={20} className="text-white" />
                            <div>
                                <h3 className="font-bold text-white">Voice Commands</h3>
                                <p className="text-xs text-white/80">Hands-free control</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPanel(false)}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={18} className="text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Mic Button */}
                        <button
                            onClick={startListening}
                            disabled={isListening}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${isListening
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
                                }`}
                        >
                            {isListening ? (
                                <>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    Listening...
                                </>
                            ) : (
                                <>
                                    <Mic size={20} />
                                    Tap to Speak
                                </>
                            )}
                        </button>

                        {/* Transcript */}
                        {transcript && (
                            <div className="mt-4 p-3 bg-dark-primary rounded-xl border border-border-muted">
                                <p className="text-xs text-text-muted mb-1">You said:</p>
                                <p className="text-white font-medium">"{transcript}"</p>
                            </div>
                        )}

                        {/* Feedback */}
                        {feedback && (
                            <div className="mt-3 p-3 bg-accent-teal/10 border border-accent-teal/20 rounded-xl">
                                <p className="text-sm text-accent-teal">{feedback}</p>
                            </div>
                        )}

                        {/* Command Examples */}
                        <div className="mt-4">
                            <p className="text-xs text-text-muted mb-2">Try saying:</p>
                            <div className="space-y-2 text-xs">
                                <div className="p-2 bg-dark-primary rounded-lg text-text-muted">
                                    "Show me the dashboard"
                                </div>
                                <div className="p-2 bg-dark-primary rounded-lg text-text-muted">
                                    "Run the forecast"
                                </div>
                                <div className="p-2 bg-dark-primary rounded-lg text-text-muted">
                                    "Log 50 burgers prepared 45 sold"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VoiceCommand;
