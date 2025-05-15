
import { useState } from 'react';
import { 
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Visit } from '@/pages/CustomerVisitsPage';
import { 
  FileText, Upload, Download, MessageSquare, Copy, Save, Search 
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface VisitListProps {
  visits: Visit[];
  onGenerateContent: (id: string) => void;
}

export const VisitList = ({ visits, onGenerateContent }: VisitListProps) => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [visitResult, setVisitResult] = useState('');
  
  const handleGenerateOrViewContent = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowContentDialog(true);
    
    // If content doesn't exist yet, generate it
    if (!visit.content) {
      onGenerateContent(visit.id);
    }
  };

  const handleUploadResult = (visit: Visit) => {
    setSelectedVisit(visit);
    setVisitResult(visit.results || '');
    setShowUploadDialog(true);
  };

  const handleDownloadAnalysis = (visit: Visit) => {
    // In a real app, this would generate and download a file
    // Here we'll just show a toast notification
    if (visit.status !== 'analyzed') {
      toast({
        title: "无法下载分析",
        description: "请先生成拜访内容并上传拜访结果。",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "分析表下载中",
      description: `${visit.customerName}的拜访分析表已开始下载。`,
    });
  };

  const handleSaveResults = () => {
    if (!selectedVisit) return;
    
    // In a real app, this would save to a database
    // Here we'll just show a toast notification
    toast({
      title: "拜访结果已保存",
      description: "您的拜访结果已成功保存。",
    });
    
    setShowUploadDialog(false);
  };

  // Simulating file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would process the file here
    // For now, we'll just simulate text extraction
    setVisitResult(`从${selectedVisit?.customerName || '客户'}拜访中获取的信息：
    
1. 客户对我们的产品表示了浓厚的兴趣
2. 他们希望能够针对特定场景进行定制化开发
3. 价格仍然是一个需要进一步讨论的重要因素
4. 他们计划在下个季度扩大合作规模`);
    
    toast({
      title: "图片上传成功",
      description: "拜访结果图片已成功识别并转换为文本。",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>拜访客户名称</TableHead>
            <TableHead>拜访主题</TableHead>
            <TableHead>拜访时间</TableHead>
            <TableHead>生成时间</TableHead>
            <TableHead>拜访状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell className="font-medium">{visit.customerName}</TableCell>
              <TableCell>{visit.subject}</TableCell>
              <TableCell>{visit.visitDate}</TableCell>
              <TableCell>{visit.generatedAt || '未生成'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  visit.status === 'analyzed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {visit.status === 'analyzed' ? '已分析' : '已创建'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1" 
                    onClick={() => handleGenerateOrViewContent(visit)}
                  >
                    {visit.content ? <FileText size={16} /> : <MessageSquare size={16} />}
                    {visit.content ? "查看拜访内容" : "AI 生成"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleUploadResult(visit)}
                  >
                    <Upload size={16} />
                    上传拜访结果
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleDownloadAnalysis(visit)}
                    disabled={visit.status !== 'analyzed'}
                  >
                    <Download size={16} />
                    下载拜访分析表
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Visit Content Dialog */}
      <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedVisit?.customerName} - 拜访内容
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-muted/50 rounded-md whitespace-pre-line">
            {selectedVisit?.content || '生成中...'}
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => {
                if (selectedVisit?.content) {
                  navigator.clipboard.writeText(selectedVisit.content);
                  toast({
                    title: "已复制到剪贴板",
                    description: "拜访内容已复制。",
                  });
                }
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              复制
            </Button>
            <Button 
              onClick={() => {
                if (selectedVisit) {
                  onGenerateContent(selectedVisit.id);
                  toast({
                    title: "内容已重新生成",
                    description: "拜访内容已更新。",
                  });
                }
              }}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              重新生成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Results Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              上传 {selectedVisit?.customerName} 的拜访结果
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-700">
                  点击上传拜访照片
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  支持 PNG, JPG 格式
                </span>
              </label>
            </div>
            
            {visitResult && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">识别结果：</h4>
                <Textarea 
                  value={visitResult}
                  onChange={(e) => setVisitResult(e.target.value)}
                  className="min-h-[150px]"
                  placeholder="您可以在此编辑识别出的文本"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleSaveResults}
              disabled={!visitResult}
            >
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
