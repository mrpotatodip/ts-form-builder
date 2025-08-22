import { useSSRPageLoader } from "./use-ssr-page-loader";
import { useEffect, useState } from "react";

interface SSRSafeLoaderProps {
  children: React.ReactNode;
  options?: {
    includeImages?: boolean;
    includeStyles?: boolean;
    includeScripts?: boolean;
    timeout?: number;
    minimumLoadTime?: number;
  };
}

export function SSRPageLoader({ children, options = {} }: SSRSafeLoaderProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure we only run client-side logic after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isLoading, loadedAssets, totalAssets, error, loadingStage } =
    useSSRPageLoader(options);

  // During SSR, don't show loader
  if (!isClient) {
    return <>{children}</>;
  }

  if (error) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{ textAlign: "center", color: "#dc2626", maxWidth: "400px" }}
        >
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
          <h2 style={{ margin: "0 0 10px", fontSize: "24px" }}>
            Loading Error
          </h2>
          <p style={{ margin: "0 0 20px", color: "#6b7280" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    const progress = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 0;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            width: "150px",
            maxWidth: "300px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#cb6442",
                transition: "width 0.3s ease",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* <p
            style={{
              margin: 0,
              opacity: 0.8,
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {loadingStage} {loadedAssets} / {totalAssets}
          </p> */}

          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
