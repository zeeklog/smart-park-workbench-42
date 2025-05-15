
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface Conversation {
  id: string;
  channel: '微信' | '小程序' | '企微应用';
  userName: string;
  botName: string;
  tenant: string;
  enterprise: string;
  project: string;
  createdAt: string;
  tags: {
    emotion?: '喜' | '怒' | '焦虑' | '中性';
    scene?: '报修' | '访客' | '投诉' | '活动';
    intent?: '续租意向' | '价格敏感' | '功能探查' | '园区活动';
  };
  // Add conversation details
  messages?: {
    sender: 'customer' | 'steward';
    content: string;
    time: string;
  }[];
}

interface ConversationTableProps {
  conversations: Conversation[];
}

const ConversationTable: React.FC<ConversationTableProps> = ({
  conversations,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleRowClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">客户</TableHead>
              <TableHead>渠道</TableHead>
              <TableHead>企业</TableHead>
              <TableHead>项目</TableHead>
              <TableHead>会话时间</TableHead>
              <TableHead>客户状态</TableHead>
              <TableHead>场景标签</TableHead>
              <TableHead>客户意图</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((conversation) => (
              <TableRow 
                key={conversation.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(conversation)}
              >
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
                <TableCell>{conversation.enterprise}</TableCell>
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
                  {conversation.tags.scene && (
                    <Badge variant="outline" className="ai-tag scene">
                      {conversation.tags.scene}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {conversation.tags.intent && (
                    <Badge variant="outline" className="ai-tag intent">
                      {conversation.tags.intent}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>对话详情</DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4 mt-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>客户: {selectedConversation.userName}</span>
                <span>企业: {selectedConversation.enterprise}</span>
                <span>渠道: {selectedConversation.channel}</span>
                <span>时间: {selectedConversation.createdAt}</span>
              </div>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
                {selectedConversation.messages ? (
                  selectedConversation.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'customer' 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs mt-1 opacity-70">{message.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无对话内容
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConversationTable;
