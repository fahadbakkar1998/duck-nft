import './index.scss';
import { useEffect, useState } from 'react';
import { AdminTabs } from '../../../../types/types';
import SettingsForm from './SettingsForm';
import AllowancesForm from './AllowancesForm';
import AccountingForm from './AccountingForm';
import AdminTabButton from './AdminTabButton';
import MotdForm from './MotdForm';
import useMachineStore from '../../../../store';
import BurnForm from './BurnForm';
import { useAccountChange } from '../../../../hooks';

const getTabTitle = (tab: AdminTabs) => {
  switch (tab) {
    case 'minting':
      return 'Mint Settings';
    case 'allowances':
      return 'Duck Allowances';
    case 'accounting':
      return 'Accounting';
    case 'motd':
      return 'Message of the Day';
    case 'burn':
      return 'Burn Custom Duck';
    default:
      return 'Duck Administration';
  }
};

const AdminMain = () => {
  // useAccountChange();
  const [activeTab, setActiveTab] = useState<AdminTabs>('minting');
  const { setAltMessage, openBurnForm } = useMachineStore();

  useEffect(() => {
    setAltMessage(undefined);
  }, [activeTab]);

  useEffect(() => {
    if (openBurnForm) {
      setActiveTab('burn');
    } else {
      setActiveTab('minting');
    }
  }, [openBurnForm]);

  return (
    <div
      className="AdminMain p-7 inner-shadow pixel-font overflow-hidden relative text-sm border-2 border-gray-600 bg-screenBlack"
    >
      <div className=" h-full w-full border rounded-lg border-orange-300 p-4">
        <div className="h-full w-full flex flex-col">
          <div className="absolute top-4 bg-screenBlack px-2 text-xl uppercase text-orange-300">
            {getTabTitle(activeTab)}
          </div>
          { activeTab !== 'burn' && (
            <div className="mt-2 grid grid-cols-4 gap-2 pixel-font-thin text-center text-lg">
              <AdminTabButton
                title="Minting"
                isActive={activeTab === 'minting'}
                onClick={() => setActiveTab('minting')}
              />
              <AdminTabButton
                title="Allow"
                isActive={activeTab === 'allowances'}
                onClick={() => setActiveTab('allowances')}
              />
              <AdminTabButton
                title="Accounting"
                isActive={activeTab === 'accounting'}
                onClick={() => setActiveTab('accounting')}
              />
              <AdminTabButton
                title="MotD"
                isActive={activeTab === 'motd'}
                onClick={() => setActiveTab('motd')}
              />
            </div>
          )}
          { activeTab === 'minting' && <SettingsForm /> }
          { activeTab === 'allowances' && <AllowancesForm /> }
          { activeTab === 'accounting' && <AccountingForm /> }
          { activeTab === 'motd' && <MotdForm /> }
          { activeTab === 'burn' && <BurnForm /> }
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
