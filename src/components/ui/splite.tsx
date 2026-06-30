import React, { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Spline WebGL failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-black/20 flex items-center justify-center">
          <div className="text-[#00ff66] font-mono text-sm tracking-[0.2em] opacity-50">
            [ VIRTUAL ENVIRONMENT OFFLINE: WEBGL CONTEXT ERROR ]
          </div>
        </div>
      );
    }
    return this.props.children; 
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="relative w-24 h-24 mb-4">
              <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[#00ff66] animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-b-2 border-r-2 border-[#ff0055] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-t-2 border-r-2 border-[#00c8ff] animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#00ff66] text-xs font-mono font-bold animate-pulse">INIT</span>
              </div>
            </div>
            <div className="text-[#00ff66] font-mono text-sm tracking-[0.3em] uppercase text-glow" data-text="Loading Assets...">
              Loading Assets...
            </div>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
