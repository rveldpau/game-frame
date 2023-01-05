import React from "react"

import "./HorizontalScroller.scss";

type LogicalPositions = "beginning"|"middle"|"end";

export function HorizontalScroller({ children }: React.PropsWithChildren<{}>) {
    const scrollerId = React.useRef<number>()
    const [scrollPosition, setScrollPosition] = React.useState<{position:number, logicalPosition:LogicalPositions}>({position:0, logicalPosition:"beginning"})
    const scrollContent = React.useRef<HTMLDivElement>();
    const scrollFrame = React.useRef<HTMLDivElement>();

    const scrollCancel = React.useCallback(() => {
        if (scrollerId.current) {
            window.clearInterval(scrollerId.current);
        }
    }, [scrollerId]);

    const adjustScroll = React.useCallback((amount:number) => {
        const maxScroll = scrollContent.current.scrollWidth - scrollContent.current.clientWidth;
        setScrollPosition(oldPosition => {
            const newPosition = Math.min(Math.max(oldPosition.position + amount, 0), maxScroll);
            const newLogicalPosition = newPosition === 0 ? "beginning" : (newPosition === maxScroll ? "end" : "middle");
            return {
                position:newPosition,
                logicalPosition: newLogicalPosition
            };
        });
    }, [scrollContent]);

    const scrollLeft = React.useCallback(() => {
        if (!scrollContent.current) return;
        scrollerId.current = window.setInterval(() => {
            adjustScroll(-20);
        }, 100);
    }, [scrollContent]);
    const scrollRight = React.useCallback(() => {
        if (!scrollContent.current) return;

        scrollerId.current = window.setInterval(() => {
            adjustScroll(20);
        }, 100);
    }, [scrollContent]);

    const quickScrollLeft = React.useCallback(() => {
        if (!scrollContent.current) return;
        adjustScroll(-scrollContent.current.offsetWidth);
    }, [scrollContent]);

    const quickScrollRight = React.useCallback(() => {
        if (!scrollContent.current) return;
        adjustScroll(scrollContent.current.offsetWidth);
    }, [scrollContent]);

    return <div className={`horizontal-scroller-container at-${scrollPosition.logicalPosition}`}>
        <div className="controls">
            <button className="left" tabIndex={-1} onMouseOver={scrollLeft} onMouseOut={scrollCancel} onClick={quickScrollLeft}>◀</button>
            <button className="right" tabIndex={-1} onMouseOver={scrollRight} onMouseOut={scrollCancel} onClick={quickScrollRight}>▶</button>
        </div>
        <div className="horizontal-scroller-frame"  ref={scrollFrame}>
            <div className="horizontal-scroller-content"  style={{ left: -scrollPosition.position}} ref={scrollContent} >
                {children}
            </div>
        </div>
    </div>
}
