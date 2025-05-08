
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DNM_THEME } from "@/lib/theme";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main dashboard
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: DNM_THEME.colors.cream}}>
      <div className="text-center p-8 rounded-lg shadow-lg bg-white">
        <div className="flex items-center justify-center mb-4">
          <div className="h-8 flex overflow-hidden rounded-sm mx-auto">
            <div className="h-full w-8 bg-black"></div>
            <div className="h-full w-8 bg-[#FFCE00]"></div>
            <div className="h-full w-8 bg-[#D90000]"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-[#306030]">Team DNM</h1>
        <p className="text-xl text-gray-600 mb-4">Loading Campaign Management System...</p>
        <p className="text-sm text-gray-500 italic">"Tureebe Omumeisho, Tureebe Hare"</p>
      </div>
    </div>
  );
};

export default Index;
