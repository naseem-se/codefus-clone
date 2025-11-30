import React, { useEffect, useRef, useState } from 'react';

const Features = () => {
  const videoRef = useRef(null);
  const [codeChars, setCodeChars] = useState([]);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            setIsVideoVisible(true);
            videoRef.current.play();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const code = `const processNumbers = (numbers: number[]): 
    number[] => { =&gt; &lbrace;
    
    
          const processed = numbers
    .filter(num => num % 2 === 0) 
    .map(num => num * num); 


      console.log('Original:', numbers);
      console.log('Processed (even numbers squared):', processed);
      const sum = processed.reduce((acc, val) => acc + val, 0);
      console.log('Sum of processed values:', sum);`;

    const lines = code.split('\n');
    const chars = [];
    
    lines.forEach((line, lineIdx) => {
      let pos = 0;
      const tokens = [
        { regex: /^(const|console)/, color: '#569CDB' },
        { regex: /^(processNumbers|processed|numbers|num|filter|map|log|reduce|acc|val|sum)/, color: '#DCDCAA' },
        { regex: /^[=(){}\[\]:.,;]/, color: '#D4D4D4' },
        { regex: /^(number|=>)/, color: '#569CDB' },
        { regex: /^[0-9]+/, color: '#B5CEA8' },
        { regex: /^'[^']*'/, color: '#CE9178' },
        { regex: /^[%*+]/, color: '#D4D4D4' },
        { regex: /^\s+/, color: 'transparent' },
      ];

      while (pos < line.length) {
        let matched = false;
        for (let token of tokens) {
          const match = line.slice(pos).match(token.regex);
          if (match) {
            const text = match[0];
            for (let i = 0; i < text.length; i++) {
              chars.push({
                char: text[i],
                color: token.color,
                delay: chars.length * 0.005
              });
            }
            pos += text.length;
            matched = true;
            break;
          }
        }
        if (!matched) {
          chars.push({
            char: line[pos],
            color: '#D4D4D4',
            delay: chars.length * 0.005
          });
          pos++;
        }
      }
      if (lineIdx < lines.length - 1) {
        chars.push({ char: '\n', color: 'transparent', delay: chars.length * 0.005 });
      }
    });

    setCodeChars(chars);
  }, []);

  return (
    <section id="features" className="mt-6 relative z-10 bg-[#000000] px-6 pt-10 pb-4 md:pt-26 md:pb-12">
      <div className="mx-auto mb-13.5 w-full max-w-[614px] text-center">
        <h2 className="bg-gradient-to-b from-[#F4F4F6] to-[#B3B0BC] bg-clip-text text-3xl font-medium text-transparent md:text-5xl md:leading-normal md:tracking-[-2px]">
          Benefits you get with CodeFus
        </h2>
        <p className="mt-5 text-[#9192A1]">
          Work with your team to fix bugs faster with shared reports and issue tracking.
        </p>
      </div>

      <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6 overflow-hidden">
        {/* Card 1: Real-Time Bug Detection */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 pb-8 backdrop-blur-[40px] flex flex-col">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Real-Time Bug Detection
          </h3>
          <p className="text-[#9192A1] mb-6">
            Instantly identify coding errors as you write, helping you catch mistakes before they cause bigger problems.
          </p>
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 pt-6 rounded-lg font-mono text-sm text-[#D4D4D4] overflow-hidden">
              <pre className="m-0 whitespace-pre-wrap break-words leading-relaxed">
                <code className="visible">
                  {codeChars.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-block"
                      style={{
                        color: item.color,
                        animation: `fadeIn 0.15s ease-out ${item.delay}s both`
                      }}
                    >
                      {item.char === '\n' ? <br /> : item.char}
                    </span>
                  ))}
                </code>
              </pre>
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-[radial-gradient(ellipse_at_center,transparent_10%,#000000_95%)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Card 2: Detailed Error Reporting */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 backdrop-blur-[40px]">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Detailed Error Reporting
          </h3>
          <p className="text-[#9192A1]">
            Get comprehensive reports on every error, including severity levels, potential solutions, and code snippets.
          </p>
          <div className="min-h-[325px]">
            <div className="relative min-h-[325px] w-full">
              {/* Front card */}
              <div className="absolute bottom-0 left-1/2 z-30 w-full max-w-[372px] -translate-x-1/2">
                <div 
                  className="relative h-[165px] rounded-t-[11px] border border-b-0 border-[rgba(115,163,255,0.25)] pt-8 pl-8 shadow-[inset_0px_17px_17px_0px_rgba(255,255,255,0.05)]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(88, 37, 171, 0.16) 0%, rgba(231, 158, 209, 0.16) 100%), #080808'
                  }}
                >
                  <p className="mb-[14px] font-semibold text-white">Recent Activity</p>
                  <p className="mb-2.5 text-4xl font-extrabold text-white">375</p>
                  <p className="font-medium text-[#EAEAEA] relative sm:opacity-50 z-10">Bugs fixed</p>
                  <img
                    alt="graph"
                    loading="lazy"
                    width="224"
                    height="100"
                    className="absolute right-0 bottom-0"
                    src="/card-graph.webp"
                  />
                </div>
              </div>
              
              {/* Middle card */}
              <div className="absolute bottom-[56px] left-1/2 z-20 h-[165px] w-full max-w-[328px] -translate-x-1/2 rounded-t-[11px] border border-[rgba(37,37,39,0.00)] bg-[#000000] shadow-[inset_0px_17px_17px_0px_rgba(255,255,255,0.05)]">
                <p className="mt-4 ml-[18px] text-[13px] font-medium text-[#EAEAEA]">Total Fixes</p>
              </div>
              
              {/* Back card */}
              <div className="absolute bottom-[100px] left-1/2 z-10 h-[165px] w-full max-w-[286px] -translate-x-1/2 rounded-t-[11px] border border-[rgba(37,37,39,0.00)] bg-[#000000] shadow-[inset_0px_17px_17px_0px_rgba(255,255,255,0.05)]">
                <p className="mt-[14px] ml-[18px] text-[12px] font-medium text-[#EAEAEA]">Total Errors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Seamless Integration */}
        <div className="w-[424px] overflow-hidden rounded-2xl border border-[rgba(182,157,255,0.20)] bg-[rgba(7,7,7,0.80)] px-8 pt-8 backdrop-blur-[40px]">
          <h3 className="mb-3 text-xl font-medium text-[#E9E9E9]">
            Seamless Integration
          </h3>
          <p className="text-[#9192A1]">
            Easily integrate with your existing development environment, supporting major languages and frameworks.
          </p>
          <div className="min-h-[325px]">
            <div className="max-h-[325px] min-h-[325px] opacity-100">
              <video
                ref={videoRef}
                src="/hexes.mp4"
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mx-auto mt-12 w-fit">
        <div className="p-[1px] rounded-[58px] bg-gradient-to-b from-[#5B66A0] to-[#10192E]">
          <a
            className="group flex items-center justify-center gap-2 px-3.5 py-2.5 font-semibold transition-shadow duration-300 ease-in-out md:px-6 md:py-3 rounded-[500px] bg-[#151322] shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_0px_0px_rgba(93,104,163,0)] hover:shadow-[0px_-10px_14px_0px_#101B36_inset,0_0_15px_#5D68A3]"
            target="_blank"
            rel="noopener noreferrer"
            href="https://riotters.com/"
          >
            <span className="bg-gradient-to-r from-[#DDB6ED] to-[#C6CAF8] bg-clip-text text-transparent">
              Try It Now For Free
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Features;