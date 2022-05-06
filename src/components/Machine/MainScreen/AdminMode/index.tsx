import "./index.scss";
import { useState} from "react";
import { AdminTabs } from "../../../../types/types";
import SettingsForm from "./SettingsForm";
import AllowancesForm from "./AllowancesForm";
import AccountingForm from "./AccountingForm";
import AdminTabButton from "./AdminTabButton";

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState<AdminTabs>(AdminTabs.Settings);

  return (
    <div className="AdminMain p-7 inner-shadow pixel-font overflow-hidden relative text-sm border-2 border-gray-600 bg-screenBlack">
      <div className=" h-full w-full border-2 p-4">
        <div className="h-full w-full flex flex-col">
          <div className="mb-2 pb-1 border-b-2 border-dashed text-base">DUCK ADMINISTRATION</div>

          <div className="flex gap-2 pixel-font-thin text-center text-base">
            <AdminTabButton 
              title='Settings' 
              isActive={activeTab === AdminTabs.Settings} 
              onClick={() => setActiveTab(AdminTabs.Settings)} 
            />
            <AdminTabButton 
              title='Duck Allowances' 
              isActive={activeTab === AdminTabs.Allowances} 
              onClick={() => setActiveTab(AdminTabs.Allowances)} 
            />
            <AdminTabButton 
              title='Accounting' 
              isActive={activeTab === AdminTabs.Accounting} 
              onClick={() => setActiveTab(AdminTabs.Accounting)} 
            />                     
          </div>          
          { activeTab === AdminTabs.Settings && <SettingsForm /> }
          { activeTab === AdminTabs.Allowances && <AllowancesForm /> }
          { activeTab === AdminTabs.Accounting && <AccountingForm /> }          
        </div>              
      </div>          
    </div>
  );
};

export default AdminMain;