
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, Save, Edit, UserPlus, Clock, History } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Define notification types
const notificationTypes = [
  { id: 'service-quality', label: '服务质量类', variants: ['客服', '主管'] },
  { id: 'project-warning', label: '项目异常预警类', variants: ['客服', '主管'] },
  { id: 'tenant-insights', label: '租户洞察类', variants: [] },
  { id: 'project-report', label: '项目运营报告', variants: [] },
];

// Mock data for initial users
const initialUsers = [
  {
    id: '1',
    name: '张三',
    phone: '13800138001',
    position: '客服主管',
    notifications: ['service-quality-staff', 'project-warning-staff'],
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138002',
    position: '运营经理',
    notifications: ['service-quality-manager', 'project-warning-manager', 'project-report'],
  },
  {
    id: '3',
    name: '王五',
    phone: '13800138003',
    position: '客服专员',
    notifications: ['tenant-insights', 'project-report'],
  },
];

// Mock data for notification history
const initialNotificationHistory = [
  {
    id: '1',
    content: '贵公司的服务质量评分本月下降5%，请及时关注',
    sentTime: '2025-05-15 09:30',
    sentTo: '张三',
    channel: '短信',
    type: 'service-quality',
  },
  {
    id: '2',
    content: '3号楼前台设备故障预警，请及时处理',
    sentTime: '2025-05-14 14:25',
    sentTo: '李四',
    channel: '邮件',
    type: 'project-warning',
  },
  {
    id: '3',
    content: '5月份项目运营报告已生成，请查看',
    sentTime: '2025-05-10 08:15',
    sentTo: '王五',
    channel: '系统通知',
    type: 'project-report',
  },
  {
    id: '4',
    content: 'ABC公司可能面临经营压力，建议提前介入',
    sentTime: '2025-05-09 16:40',
    sentTo: '李四',
    channel: '邮件',
    type: 'tenant-insights',
  },
  {
    id: '5',
    content: '本周客服满意度评分汇总，请查看',
    sentTime: '2025-05-05 10:20',
    sentTo: '张三',
    channel: '短信',
    type: 'service-quality',
  },
];

const NotificationSettingsPage = () => {
  const [users, setUsers] = useState<Array<{
    id: string;
    name: string;
    phone: string;
    position: string;
    notifications: string[];
  }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPersonnelSynced, setIsPersonnelSynced] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('settings');
  const [notificationHistory, setNotificationHistory] = useState<Array<{
    id: string;
    content: string;
    sentTime: string;
    sentTo: string;
    channel: string;
    type: string;
  }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { toast } = useToast();

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.includes(searchQuery) || user.phone.includes(searchQuery)
  );

  // Toggle notification type for a user
  const toggleNotification = (userId: string, notificationType: string) => {
    if (userId !== editingUserId) return;
    
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedNotifications = user.notifications.includes(notificationType)
            ? user.notifications.filter(type => type !== notificationType)
            : [...user.notifications, notificationType];
          
          return { ...user, notifications: updatedNotifications };
        }
        return user;
      })
    );
  };

  // Sync personnel data
  const syncPersonnel = () => {
    // In a real app, here you would fetch data from your backend
    setUsers(initialUsers);
    setIsPersonnelSynced(true);
    
    toast({
      title: "人员同步成功",
      description: "已同步最新的人员数据",
    });
  };

  // Start editing a user's notification settings
  const startEditing = (userId: string) => {
    setEditingUserId(userId);
  };

  // Save changes for the currently edited user
  const saveUserSettings = (userId: string) => {
    // In a real app, here you would send the data to your backend
    setEditingUserId(null);
    
    toast({
      title: "保存成功",
      description: "用户推送设置已更新",
    });
  };

  // Load notification history
  const loadNotificationHistory = () => {
    // In a real app, here you would fetch data from your backend
    setNotificationHistory(initialNotificationHistory);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'history' && notificationHistory.length === 0) {
      loadNotificationHistory();
    }
  };

  // Get notification type label
  const getNotificationTypeLabel = (typeId: string) => {
    const type = notificationTypes.find(t => t.id === typeId);
    return type ? type.label : typeId;
  };

  // Calculate pagination
  const totalPages = Math.ceil(notificationHistory.length / itemsPerPage);
  const paginatedHistory = notificationHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">推送管理</h1>
        <div className="flex space-x-2">
          {!isPersonnelSynced && (
            <Button onClick={syncPersonnel}>
              <UserPlus className="mr-2 h-4 w-4" />
              同步人员数据
            </Button>
          )}
          {isPersonnelSynced && (
            <Button
              variant="outline"
              onClick={syncPersonnel}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              同步
            </Button>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">推送设置</TabsTrigger>
          <TabsTrigger value="history">推送记录</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          {isPersonnelSynced ? (
            <>
              <div className="flex max-w-sm items-center rounded-md border bg-background px-3 py-2 mb-6">
                <Search size={18} className="mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索用户名或手机号..."
                  className="w-full bg-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">用户名称</TableHead>
                      <TableHead className="w-[150px]">手机号</TableHead>
                      <TableHead className="w-[120px]">岗位</TableHead>
                      {notificationTypes.map(type => (
                        type.variants.length > 0 ? (
                          type.variants.map(variant => (
                            <TableHead key={`${type.id}-${variant}`} className="text-center">
                              {type.label}-{variant}
                            </TableHead>
                          ))
                        ) : (
                          <TableHead key={type.id} className="text-center">
                            {type.label}
                          </TableHead>
                        )
                      )).flat()}
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.position}</TableCell>
                          {notificationTypes.map(type => (
                            type.variants.length > 0 ? (
                              type.variants.map(variant => (
                                <TableCell key={`${type.id}-${variant}`} className="text-center">
                                  <Checkbox
                                    checked={user.notifications.includes(`${type.id}-${variant.toLowerCase()}`)}
                                    onCheckedChange={() => toggleNotification(user.id, `${type.id}-${variant.toLowerCase()}`)}
                                    disabled={editingUserId !== user.id}
                                  />
                                </TableCell>
                              ))
                            ) : (
                              <TableCell key={type.id} className="text-center">
                                <Checkbox
                                  checked={user.notifications.includes(type.id)}
                                  onCheckedChange={() => toggleNotification(user.id, type.id)}
                                  disabled={editingUserId !== user.id}
                                />
                              </TableCell>
                            )
                          )).flat()}
                          <TableCell>
                            {editingUserId === user.id ? (
                              <Button 
                                size="sm" 
                                onClick={() => saveUserSettings(user.id)}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                保存
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => startEditing(user.id)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                编辑
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={notificationTypes.reduce((acc, type) => acc + Math.max(type.variants.length, 1), 3) + 1} className="text-center py-4">
                          没有找到匹配的用户
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
              <UserPlus className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">请先同步人员数据</h3>
              <p className="text-muted-foreground mb-4">同步人员数据后才能配置推送设置</p>
              <Button onClick={syncPersonnel}>立即同步</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">推送内容</TableHead>
                  <TableHead className="w-[150px]">推送时间</TableHead>
                  <TableHead className="w-[100px]">推送用户</TableHead>
                  <TableHead className="w-[100px]">推送渠道</TableHead>
                  <TableHead className="w-[150px]">业务类型</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.content}</TableCell>
                      <TableCell>{record.sentTime}</TableCell>
                      <TableCell>{record.sentTo}</TableCell>
                      <TableCell>{record.channel}</TableCell>
                      <TableCell>{getNotificationTypeLabel(record.type)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      无推送记录
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {notificationHistory.length > itemsPerPage && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettingsPage;
