import type { CanvasTextWrapper } from "canvas-text-wrapper"

// Add the CanvasTextWrapper type to the global scope
declare global {
    interface Window {
        CanvasTextWrapper: typeof CanvasTextWrapper;
    }
}