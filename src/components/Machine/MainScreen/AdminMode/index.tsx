import './index.scss';
import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { AdminTabs } from '../../../../types/types';
import SettingsForm from './SettingsForm';
import AllowancesForm from './AllowancesForm';
import AccountingForm from './AccountingForm';
import AdminTabButton from './AdminTabButton';
import MotdForm from './MotdForm';
import useMachineStore from '../../../../store';
import BurnForm from './BurnForm';
import { useAccountChange } from '../../../../hooks';

const AdminMain = () => {
  useAccountChange();
  const [activeTab, setActiveTab] = useState<AdminTabs>(AdminTabs.Settings);
  const { setAltMessage, openBurnForm } = useMachineStore();

  useEffect(() => {
    setAltMessage(undefined);
  }, [activeTab]);

  useEffect(() => {
    if (openBurnForm) {
      setActiveTab(AdminTabs.Burn);
    } else {
      setActiveTab(AdminTabs.Settings);
    }
  }, [openBurnForm]);

  return (
    <div className="AdminMain p-7 inner-shadow pixel-font overflow-hidden relative text-sm border-2 border-gray-600 bg-screenBlack">
      <div className=" h-full w-full ">
        <div className="h-full w-full flex flex-col">
          <div className="text-base">DUCK ADMINISTRATION</div>
          { activeTab !== AdminTabs.Burn && (
            <div className="mt-2 grid grid-cols-3 gap-2 pixel-font-thin text-center text-base">
              <AdminTabButton
                title="Minting"
                isActive={activeTab === AdminTabs.Settings}
                onClick={() => setActiveTab(AdminTabs.Settings)}
              />
              <AdminTabButton
                title="Duck Allowances"
                isActive={activeTab === AdminTabs.Allowances}
                onClick={() => setActiveTab(AdminTabs.Allowances)}
              />
              <AdminTabButton
                title="Accounting"
                isActive={activeTab === AdminTabs.Accounting}
                onClick={() => setActiveTab(AdminTabs.Accounting)}
              />
              <AdminTabButton
                title="MotD"
                isActive={activeTab === AdminTabs.Motd}
                onClick={() => setActiveTab(AdminTabs.Motd)}
              />
              {/* <AdminTabButton
                title="Duck Review"
                isActive={activeTab === AdminTabs.Burn}
                onClick={() => setActiveTab(AdminTabs.Burn)}
              /> */}
            </div>
          )}
          { activeTab === AdminTabs.Settings && <SettingsForm /> }
          { activeTab === AdminTabs.Allowances && <AllowancesForm /> }
          { activeTab === AdminTabs.Accounting && <AccountingForm /> }
          { activeTab === AdminTabs.Motd && <MotdForm /> }
          { activeTab === AdminTabs.Burn && <BurnForm /> }
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
