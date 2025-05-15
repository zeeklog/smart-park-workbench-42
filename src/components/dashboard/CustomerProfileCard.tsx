
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface CustomerProfile {
  id: string;
  company: string;
  tags: string[];
  satisfactionScore: number;
  dimensionScores: {
    complaintHealth: number;
    resolutionAbility: number;
    emotionAssessment: number;
  };
  riskStatus?: string;
  recentActivity?: string;
}

interface CustomerProfileCardProps {
  profile: CustomerProfile;
}

const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ profile }) => {
  const navigate = useNavigate();
  
  const getSatisfactionColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRiskStatusColor = (status?: string) => {
    if (!status) return '';
    switch (status) {
      case '高风险':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case '中风险':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case '低风险':
      default:
        return 'bg-green-100 text-green-800 hover:bg-green-100';
    }
  };

  const handleCardClick = () => {
    navigate(`/customer-profiles/${profile.id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow" 
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{profile.company}</CardTitle>
          </div>
          {profile.riskStatus && (
            <Badge variant="outline" className={getRiskStatusColor(profile.riskStatus)}>
              {profile.riskStatus}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <span className={`text-3xl font-bold ${getSatisfactionColor(profile.satisfactionScore)}`}>
              {profile.satisfactionScore}分
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">投诉健康</span>
              <span>{profile.dimensionScores.complaintHealth}分</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">诉求解决</span>
              <span>{profile.dimensionScores.resolutionAbility}分</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">情绪判断</span>
              <span>{profile.dimensionScores.emotionAssessment}分</span>
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

          {profile.recentActivity && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">最近活动</p>
              <p className="text-sm">{profile.recentActivity}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerProfileCard;
