
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface CustomerProfile {
  id: string;
  name: string;
  company: string;
  tags: string[];
  satisfactionScore: number;
  recentActivity: string;
  renewalProbability: number;
}

interface CustomerProfileCardProps {
  profile: CustomerProfile;
}

const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ profile }) => {
  const getSatisfactionColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRenewalColor = (probability: number) => {
    if (probability >= 70) return 'text-green-500';
    if (probability >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.company}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">满意度评分</span>
              <span className={`text-sm font-bold ${getSatisfactionColor(profile.satisfactionScore)}`}>
                {profile.satisfactionScore}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">续租概率</span>
              <span className={`text-sm font-bold ${getRenewalColor(profile.renewalProbability)}`}>
                {profile.renewalProbability}%
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">AI标签</p>
            <div className="flex flex-wrap gap-1">
              {profile.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="ai-tag intent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">最近活动</p>
            <p className="text-sm">{profile.recentActivity}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerProfileCard;
