
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
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>渠道</TableHead>
            <TableHead>用户名称</TableHead>
            <TableHead>客服Bot</TableHead>
            <TableHead>租户</TableHead>
            <TableHead>项目</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>标签</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversations.map((conversation) => (
            <TableRow key={conversation.id}>
              <TableCell>{conversation.channel}</TableCell>
              <TableCell>{conversation.userName}</TableCell>
              <TableCell>{conversation.botName}</TableCell>
              <TableCell>{conversation.tenant}</TableCell>
              <TableCell>{conversation.project}</TableCell>
              <TableCell>{conversation.createdAt}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {conversation.tags.emotion && (
                    <Badge variant="outline" className={`ai-tag emotion-${conversation.tags.emotion === '喜' ? 'happy' : conversation.tags.emotion === '怒' ? 'angry' : conversation.tags.emotion === '焦虑' ? 'anxious' : 'neutral'}`}>
                      {conversation.tags.emotion}
                    </Badge>
                  )}
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
