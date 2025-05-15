
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Visit } from '@/pages/CustomerVisitsPage';
import { toast } from "@/hooks/use-toast";

// Sample customers data
const CUSTOMERS = [
  { id: '1', name: '阿里巴巴' },
  { id: '2', name: '腾讯科技' },
  { id: '3', name: '百度' },
  { id: '4', name: '京东' },
  { id: '5', name: '字节跳动' },
];

const formSchema = z.object({
  customerName: z.string({
    required_error: "请选择拜访客户",
  }),
  subject: z.string().min(1, "请输入拜访主题"),
  visitDate: z.date({
    required_error: "请选择拜访时间",
  }),
});

interface AddVisitFormProps {
  onAddVisit: (visit: Omit<Visit, 'id' | 'status'>) => void;
}

export const AddVisitForm = ({ onAddVisit }: AddVisitFormProps) => {
  const [showAIContentDialog, setShowAIContentDialog] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddVisit({
      customerName: CUSTOMERS.find(c => c.id === values.customerName)?.name || values.customerName,
      subject: values.subject,
      visitDate: format(values.visitDate, 'yyyy-MM-dd'),
      generatedAt: null
    });
    toast({
      title: "拜访已创建",
      description: "新的拜访记录已成功创建。",
    });
    form.reset();
  };

  const handleGenerateAIContent = () => {
    const values = form.getValues();
    if (!values.customerName) {
      form.setError('customerName', { message: '请先选择客户' });
      return;
    }

    const customerName = CUSTOMERS.find(c => c.id === values.customerName)?.name;
    setGeneratedContent(
      `对于${customerName}的拜访重点建议：\n\n` +
      `1. 了解${customerName}最新的业务发展方向和需求\n` +
      `2. 介绍我方最新的产品功能和服务\n` +
      `3. 讨论合作深化的可能性\n` +
      `4. 收集客户反馈，为产品迭代提供方向`
    );
    setShowAIContentDialog(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>拜访客户</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择拜访客户" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CUSTOMERS.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>拜访主题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入拜访主题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>拜访时间</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'yyyy-MM-dd')
                        ) : (
                          <span>选择拜访时间</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">保存</Button>
          </div>
        </form>
      </Form>

      <Dialog open={showAIContentDialog} onOpenChange={setShowAIContentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>拜访重点内容</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-muted/50 rounded-md whitespace-pre-line">
            {generatedContent}
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(generatedContent);
                toast({
                  title: "已复制到剪贴板",
                  description: "拜访重点内容已复制。",
                });
              }}
            >
              复制
            </Button>
            <Button onClick={() => setShowAIContentDialog(false)}>
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
