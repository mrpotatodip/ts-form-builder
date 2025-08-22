// hooks/useSSRSafeAssetLoader.ts
import { useState, useEffect } from "react";

interface AssetLoadingState {
  isLoading: boolean;
  loadedAssets: number;
  totalAssets: number;
  error: string | null;
  loadingStage: "initializing" | "loading" | "complete";
}

interface AssetLoaderOptions {
  includeImages?: boolean;
  includeStyles?: boolean;
  includeScripts?: boolean;
  timeout?: number;
  minimumLoadTime?: number;
}

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

export function useSSRPageLoader(options: AssetLoaderOptions = {}) {
  const {
    includeImages = true,
    includeStyles = true,
    includeScripts = true,
    timeout = 10000,
    minimumLoadTime = 500,
  } = options;

  const [state, setState] = useState<AssetLoadingState>({
    isLoading: isBrowser, // Only show loading in browser
    loadedAssets: 0,
    totalAssets: 0,
    error: null,
    loadingStage: "initializing",
  });

  useEffect(() => {
    // Early return if not in browser
    if (!isBrowser) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        loadingStage: "complete",
      }));
      return;
    }

    let mounted = true;
    let loadedCount = 0;
    const startTime = Date.now();

    const updateState = (updates: Partial<AssetLoadingState>) => {
      if (mounted) {
        setState((prev) => ({ ...prev, ...updates }));
      }
    };

    const checkAssets = async () => {
      try {
        updateState({ loadingStage: "loading" });

        const assetPromises: Promise<void>[] = [];
        let totalAssets = 0;

        // Helper function to create asset promise
        const createAssetPromise = (
          element: Element,
          checkFn: (el: Element) => Promise<void>
        ) => {
          totalAssets++;
          return checkFn(element)
            .then(() => {
              loadedCount++;
              updateState({ loadedAssets: loadedCount });
            })
            .catch((error) => {
              console.warn("Asset loading error:", error);
              loadedCount++;
              updateState({ loadedAssets: loadedCount });
            });
        };

        // Check stylesheets
        if (includeStyles) {
          const stylesheets = document.querySelectorAll(
            'link[rel="stylesheet"]'
          );
          stylesheets.forEach((link) => {
            assetPromises.push(createAssetPromise(link, checkStylesheet));
          });
        }

        // Check images
        if (includeImages) {
          const images = document.querySelectorAll("img[src]");
          images.forEach((img) => {
            assetPromises.push(createAssetPromise(img, checkImage));
          });
        }

        // Check scripts
        if (includeScripts) {
          const scripts = document.querySelectorAll("script[src]");
          scripts.forEach((script) => {
            assetPromises.push(createAssetPromise(script, checkScript));
          });
        }

        updateState({ totalAssets });

        // If no assets to load, complete immediately
        if (totalAssets === 0) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

          setTimeout(() => {
            if (mounted) {
              updateState({
                isLoading: false,
                loadingStage: "complete",
              });
            }
          }, remainingTime);
          return;
        }

        // Wait for all assets or timeout
        const timeoutPromise = new Promise<void>((_, reject) => {
          setTimeout(() => reject(new Error("Asset loading timeout")), timeout);
        });

        try {
          await Promise.race([Promise.all(assetPromises), timeoutPromise]);
        } catch (error) {
          console.warn("Some assets failed to load or timed out:", error);
        }

        // Ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

        setTimeout(() => {
          if (mounted) {
            updateState({
              isLoading: false,
              loadingStage: "complete",
            });
          }
        }, remainingTime);
      } catch (error) {
        updateState({
          error: error instanceof Error ? error.message : "Unknown error",
          isLoading: false,
          loadingStage: "complete",
        });
      }
    };

    // Start checking when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkAssets);
    } else {
      // Small delay to ensure all elements are in DOM
      setTimeout(checkAssets, 100);
    }

    return () => {
      mounted = false;
      document.removeEventListener("DOMContentLoaded", checkAssets);
    };
  }, [includeImages, includeStyles, includeScripts, timeout, minimumLoadTime]);

  return state;
}

// Asset checking functions (same as before but with safety checks)
async function checkStylesheet(element: Element): Promise<void> {
  if (!isBrowser) return Promise.resolve();

  const link = element as HTMLLinkElement;

  return new Promise<void>((resolve, reject) => {
    if (link.sheet) {
      resolve();
      return;
    }

    const onLoad = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Failed to load stylesheet: ${link.href}`));
    };

    const cleanup = () => {
      link.removeEventListener("load", onLoad);
      link.removeEventListener("error", onError);
    };

    link.addEventListener("load", onLoad);
    link.addEventListener("error", onError);

    setTimeout(() => {
      cleanup();
      resolve();
    }, 5000);
  });
}

async function checkImage(element: Element): Promise<void> {
  if (!isBrowser) return Promise.resolve();

  const img = element as HTMLImageElement;

  return new Promise<void>((resolve, reject) => {
    if (img.complete && img.naturalWidth > 0) {
      resolve();
      return;
    }

    const onLoad = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error(`Failed to load image: ${img.src}`));
    };

    const cleanup = () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    setTimeout(() => {
      cleanup();
      resolve();
    }, 5000);
  });
}

async function checkScript(element: Element): Promise<void> {
  if (!isBrowser) return Promise.resolve();

  const script = element as HTMLScriptElement;

  return new Promise<void>((resolve, reject) => {
    if (!script.src) {
      resolve();
      return;
    }

    if (script.hasAttribute("data-loaded")) {
      resolve();
      return;
    }

    const onLoad = () => {
      cleanup();
      script.setAttribute("data-loaded", "true");
      resolve();
    };

    const onError = () => {
      cleanup();
      script.setAttribute("data-loaded", "true");
      reject(new Error(`Failed to load script: ${script.src}`));
    };

    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    setTimeout(() => {
      cleanup();
      resolve();
    }, 5000);
  });
}
