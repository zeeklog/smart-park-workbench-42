
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, User } from 'lucide-react';

export interface Conversation {
  id: string;
  channel: '微信' | '小程序' | '企微应用';
  userName: string;
  botName: string;
  tenant: string;
  project: string;
  createdAt: string;
  tags: {
    emotion?: '喜' | '怒' | '焦虑' | '中性';
    scene?: '报修' | '访客' | '投诉' | '活动';
    intent?: '续租意向' | '价格敏感' | '功能探查' | '园区活动';
  };
}

interface ConversationTableProps {
  conversations: Conversation[];
}

const ConversationTable: React.FC<ConversationTableProps> = ({
  conversations,
}) => {
  // Get channel icon
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case '微信':
        return 'text-green-500';
      case '小程序':
        return 'text-blue-500';
      case '企微应用':
        return 'text-purple-500';
      default:
        return '';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">客户</TableHead>
            <TableHead>渠道</TableHead>
            <TableHead>租户</TableHead>
            <TableHead>项目</TableHead>
            <TableHead>会话时间</TableHead>
            <TableHead>客户状态</TableHead>
            <TableHead>需求标签</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversations.map((conversation) => (
            <TableRow key={conversation.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User size={16} />
                  </span>
                  {conversation.userName}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ${getChannelIcon(conversation.channel)}`}>
                    <MessageSquare size={14} />
                  </span>
                  {conversation.channel}
                </div>
              </TableCell>
              <TableCell>{conversation.tenant}</TableCell>
              <TableCell>{conversation.project}</TableCell>
              <TableCell>{conversation.createdAt}</TableCell>
              <TableCell>
                {conversation.tags.emotion && (
                  <Badge variant="outline" className={`ai-tag emotion-${conversation.tags.emotion === '喜' ? 'happy' : conversation.tags.emotion === '怒' ? 'angry' : conversation.tags.emotion === '焦虑' ? 'anxious' : 'neutral'}`}>
                    {conversation.tags.emotion}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {conversation.tags.scene && (
                    <Badge variant="outline" className="ai-tag scene">
                      {conversation.tags.scene}
                    </Badge>
                  )}
                  {conversation.tags.intent && (
                    <Badge variant="outline" className="ai-tag intent">
                      {conversation.tags.intent}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConversationTable;
