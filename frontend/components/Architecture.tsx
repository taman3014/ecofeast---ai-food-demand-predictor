import React from 'react';
import { Database, Cpu, Layout, Server, ArrowRight, Share2, ShieldCheck, Zap } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">System Architecture</h1>
        <p className="text-text-muted text-lg">A scalable, AI-integrated infrastructure designed for real-world restaurant efficiency.</p>
      </div>

      {/* Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center bg-dark-secondary p-12 rounded-[40px] border border-border-muted shadow-lg">
        <ArchNode
          icon={<Layout className="text-accent-teal" />}
          title="Frontend"
          tech="React + Tailwind"
          desc="Intuitive dashboard for kitchen managers & owners."
        />
        <div className="hidden lg:flex justify-center text-dark-tertiary"><ArrowRight /></div>
        <ArchNode
          icon={<Server className="text-blue-400" />}
          title="Backend (Proxy)"
          tech="Node.js API"
          desc="Handles authentication, data persistence & logic."
        />
        <div className="hidden lg:flex justify-center text-dark-tertiary"><ArrowRight /></div>
        <ArchNode
          icon={<Cpu className="text-purple-400" />}
          title="AI Engine"
          tech="Gemini 3 Flash"
          desc="Advanced pattern recognition for demand forecasting."
        />
        <div className="hidden lg:flex justify-center text-dark-tertiary"><ArrowRight /></div>
        <ArchNode
          icon={<Database className="text-amber-400" />}
          title="Database"
          tech="MongoDB (JSON)"
          desc="Distributed storage for history, logs & predictions."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-dark-tertiary text-white p-8 rounded-3xl border border-border-muted shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-yellow-400 fill-yellow-400/20" />
            Data Flow Pipeline
          </h3>
          <ul className="space-y-6">
            <FlowStep num="1" title="Data Ingestion" text="POS systems push daily sales and preparation figures to the central API." />
            <FlowStep num="2" title="Context Preparation" text="The system cleanses data and attaches metadata like holidays and weather." />
            <FlowStep num="3" title="AI Inference" text="Gemini analyzes rolling historical windows to generate tomorrow's forecast." />
            <FlowStep num="4" title="Execution" text="Forecasts are sent to kitchen staff tablets for real-time prep guidance." />
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-accent-teal/10 border border-accent-teal/20 p-6 rounded-2xl">
            <h4 className="font-bold text-accent-teal mb-2 flex items-center gap-2">
              <ShieldCheck size={18} />
              Sustainability Impact
            </h4>
            <p className="text-sm text-accent-teal/80 leading-relaxed font-medium">
              By reducing over-preparation by just 15%, EcoFeast helps mid-sized restaurants save an average of ₹24,000 annually and prevents 2.4 tons of food waste from entering landfills.
            </p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/20 p-6 rounded-2xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Share2 size={18} />
              Scalability Strategy
            </h4>
            <p className="text-sm text-blue-400/80 leading-relaxed font-medium">
              Designed as a microservices architecture, EcoFeast can scale horizontally to support multi-chain restaurants with unified cross-location analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchNode: React.FC<{ icon: React.ReactNode, title: string, tech: string, desc: string }> = ({ icon, title, tech, desc }) => (
  <div className="text-center p-6 rounded-2xl hover:bg-dark-tertiary/10 transition-colors">
    <div className="w-16 h-16 bg-dark-tertiary rounded-2xl shadow-md border border-border-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
      {React.cloneElement(icon as React.ReactElement, { size: 32 })}
    </div>
    <h4 className="font-bold text-white">{title}</h4>
    <p className="text-[10px] font-mono text-accent-teal/60 mb-2 uppercase tracking-tighter">{tech}</p>
    <p className="text-sm text-text-muted leading-tight">{desc}</p>
  </div>
);

const FlowStep: React.FC<{ num: string, title: string, text: string }> = ({ num, title, text }) => (
  <li className="flex gap-4">
    <div className="w-6 h-6 rounded-full bg-accent-teal flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1 text-dark-primary">
      {num}
    </div>
    <div>
      <h5 className="font-bold text-white mb-1">{title}</h5>
      <p className="text-sm text-text-muted leading-relaxed">{text}</p>
    </div>
  </li>
);

export default Architecture;
