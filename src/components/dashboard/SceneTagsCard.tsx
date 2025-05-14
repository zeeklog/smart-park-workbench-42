
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TagData {
  label: string;
  count: number;
}

interface SceneTagsCardProps {
  title: string;
  tags: TagData[];
  className?: string;
  badgeClassName?: string;
}

const SceneTagsCard: React.FC<SceneTagsCardProps> = ({
  title,
  tags,
  className = '',
  badgeClassName = 'ai-tag scene',
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.label} variant="outline" className={badgeClassName}>
              {tag.label} ({tag.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SceneTagsCard;
