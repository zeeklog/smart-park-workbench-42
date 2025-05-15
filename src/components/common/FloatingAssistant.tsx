
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Position {
  x: number;
  y: number;
}

const FloatingAssistant = () => {
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const assistantRef = useRef<HTMLDivElement>(null);

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (assistantRef.current) {
      const rect = assistantRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Handle mouse move event for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // Calculate new position based on mouse position and drag offset
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Set boundaries to prevent dragging off-screen
      const maxX = window.innerWidth - 80; // 80px is approximately the width of the assistant
      const maxY = window.innerHeight - 80; // 80px is approximately the height of the assistant
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        ref={assistantRef}
        className={`fixed z-50 w-16 h-16 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'all 0.1s ease',
        }}
        onMouseDown={handleMouseDown}
        onClick={() => !isDragging && setIsDialogOpen(true)}
      >
        <div className="relative w-full h-full group">
          <img 
            src="/lovable-uploads/e84fc324-f7a7-47db-85cb-9000cfee2ed3.png" 
            alt="AI 助手" 
            className="w-16 h-16 rounded-full animate-pulse-subtle shadow-lg hover:scale-110 transition-transform duration-200"
          />
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-200">
            AI
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI 助手</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              您好，我是园区AI助手，有什么可以帮助您的吗？
            </p>
            <div className="bg-muted/50 p-4 rounded-md">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">提示</span>
                  <span>帮我分析最近的客户投诉</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">提示</span>
                  <span>生成下周拜访客户的谈话要点</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">提示</span>
                  <span>推荐今天需要重点关注的客户</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2 bg-background border rounded-md p-2">
              <input 
                type="text" 
                className="flex-1 bg-transparent outline-none text-sm" 
                placeholder="请输入您的问题..."
              />
              <Button size="sm">发送</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingAssistant;
