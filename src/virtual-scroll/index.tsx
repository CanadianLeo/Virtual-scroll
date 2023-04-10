import { useLayoutEffect, useState } from "react";
import { VirtualScrollProps } from "./type";
import './virtual-scroll.css';

export const VirtualScroll = ({ items }: VirtualScrollProps) => {
  const MIN_OFFSET = 1000;

  const [topTrigger, setTopTrigger] = useState(0);
  const [bottomTrigger, setBottomTrigger] = useState(0);

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const [viewList, setViewList] = useState([items[topIndex]]);

  useLayoutEffect(() => {
    const container = document.querySelector('[data-virtual-scroll-id="container"]');
    const containerHeight = container?.clientHeight ?? 0;
    const scrollTop = container?.scrollTop ?? 0;

    const virtualScrollContainer = document.querySelector('[data-virtual-scroll-id="virtual-scroll-container"]');
    const scrollHeight = virtualScrollContainer?.scrollHeight ?? 0;

    if (containerHeight >= scrollHeight - MIN_OFFSET) {
      if (bottomIndex !== items.length) {
        setBottomIndex(bottomIndex + 1);
      } else if (topIndex !== 0) {
        setTopIndex(topIndex - 1);
      }
    }

    console.log(scrollTop, containerHeight + MIN_OFFSET)
    if (scrollTop > containerHeight + MIN_OFFSET) {
      setTopIndex(topIndex + 1);
      console.log('topIndex decrement', scrollTop, containerHeight + MIN_OFFSET);
    }
    if (scrollTop < scrollHeight - MIN_OFFSET) {
      //setBottomIndex(bottomIndex - 1);
      console.log('bottom decrement', scrollTop, scrollHeight - MIN_OFFSET);
    }

    setTopTrigger(300);
    setBottomTrigger(scrollHeight - containerHeight - 300);

    setViewList(items.slice(topIndex, bottomIndex - topIndex + 1));

  }, [topIndex, bottomIndex, items]);

  const onScrollHandler = () => {
    const virtualScrollContainer = document.querySelector('[data-virtual-scroll-id="container"]');
    const scrollTop = virtualScrollContainer?.scrollTop ?? 0;
    if (scrollTop >= bottomTrigger && bottomIndex !== items.length) {
      console.log('bottom trigger');
      setBottomIndex(bottomIndex + 1);
    }
    if (scrollTop <= topTrigger && topIndex !== 0) {
      console.log('topTrigger');
      setTopIndex(topIndex - 1);
    }
  }

  return (
    <div className="container" data-virtual-scroll-id="container" onScroll={onScrollHandler}>
      <div data-virtual-scroll-id="virtual-scroll-container">
        {viewList.map((item, index) => 
          <div key={index}>
            {item}
          </div>
        )}
      </div>
    </div>
  );
}