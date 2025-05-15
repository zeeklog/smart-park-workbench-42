
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
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

  const radarData = [
    { subject: '投诉健康', A: profile.dimensionScores.complaintHealth, fullMark: 100 },
    { subject: '诉求解决', A: profile.dimensionScores.resolutionAbility, fullMark: 100 },
    { subject: '情绪判断', A: profile.dimensionScores.emotionAssessment, fullMark: 100 },
  ];

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
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Building size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">{profile.company}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={11} />
                <Radar
                  name="得分"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">总体满意度</span>
              <span className={`text-sm font-bold ${getSatisfactionColor(profile.satisfactionScore)}`}>
                {profile.satisfactionScore}分
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
