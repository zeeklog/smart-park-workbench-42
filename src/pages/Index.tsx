
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the dashboard
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">园区 AI 工作台</h1>
        <p className="text-xl text-gray-600 mb-8">AI 驱动的园区管理智能平台</p>
        <Button size="lg" onClick={() => navigate('/')}>
          进入工作台
        </Button>
      </div>
    </div>
  );
};

export default Index;
