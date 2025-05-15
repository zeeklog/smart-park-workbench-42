
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Mock data for notification history
const initialNotifications = [
  {
    id: '1',
    content: '服务质量评分下降预警',
    time: '2025-05-14 14:30',
    user: '张三',
    channel: '短信',
    type: '服务质量类',
  },
  {
    id: '2',
    content: '企业XX预测续约率降低',
    time: '2025-05-13 10:15',
    user: '李四',
    channel: '邮件',
    type: '租户洞察类',
  },
  {
    id: '3',
    content: '项目运营异常',
    time: '2025-05-12 16:45',
    user: '王五',
    channel: '微信',
    type: '项目异常预警类',
  },
  {
    id: '4',
    content: '客户满意度调研结果',
    time: '2025-05-11 09:20',
    user: '张三',
    channel: '短信',
    type: '服务质量类',
  },
  {
    id: '5',
    content: '企业YY经营状况分析',
    time: '2025-05-10 13:40',
    user: '李四',
    channel: '邮件',
    type: '租户洞察类',
  },
  {
    id: '6',
    content: '物业服务不及时预警',
    time: '2025-05-09 11:55',
    user: '王五',
    channel: '微信',
    type: '项目异常预警类',
  },
  {
    id: '7',
    content: '月度服务评价汇总',
    time: '2025-05-08 16:10',
    user: '张三',
    channel: '短信',
    type: '服务质量类',
  },
  {
    id: '8',
    content: '企业ZZ退租风险预警',
    time: '2025-05-07 10:30',
    user: '李四',
    channel: '邮件',
    type: '租户洞察类',
  },
];

const NotificationListPage = () => {
  const [notifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter(notification =>
    notification.content.includes(searchQuery) ||
    notification.user.includes(searchQuery) ||
    notification.type.includes(searchQuery)
  );

  // Paginate notifications
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">推送列表</h1>
      </div>
      
      <div className="flex max-w-sm items-center rounded-md border bg-background px-3 py-2 mb-6">
        <Search size={18} className="mr-2 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索推送内容、用户或类型..."
          className="w-full bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
            {currentNotifications.length > 0 ? (
              currentNotifications.map(notification => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.content}</TableCell>
                  <TableCell>{notification.time}</TableCell>
                  <TableCell>{notification.user}</TableCell>
                  <TableCell>{notification.channel}</TableCell>
                  <TableCell>{notification.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  没有找到匹配的推送记录
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredNotifications.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default NotificationListPage;
