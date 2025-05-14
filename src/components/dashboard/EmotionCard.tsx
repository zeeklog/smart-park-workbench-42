
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EmotionData {
  label: '喜' | '怒' | '焦虑' | '中性';
  count: number;
  percentage: number;
}

interface EmotionCardProps {
  emotions: EmotionData[];
  total: number;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ emotions, total }) => {
  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case '喜':
        return 'bg-emotion-happy';
      case '怒':
        return 'bg-emotion-angry';
      case '焦虑':
        return 'bg-emotion-anxious';
      default:
        return 'bg-emotion-neutral';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">情绪分布</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emotions.map((emotion) => (
            <div key={emotion.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{emotion.label}</span>
                <span className="text-muted-foreground">
                  {emotion.count} ({emotion.percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress
                value={emotion.percentage}
                className={`h-2 ${getEmotionColor(emotion.label)}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionCard;
