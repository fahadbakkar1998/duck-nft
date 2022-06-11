/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { padStart } from 'lodash';
import { shortenAddress } from '@usedapp/core';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import { DuckData } from '../../../types/types';
import { useDuckProfile } from '../../../hooks/ducks';

const FieldLabel = ({ text }: {text:string}) => {
  return <div className="pixel-font text-sm">{text.toUpperCase()}</div>;
};

const Field = ({ text }: {text:string}) => {
  return <div className="text-lg  pixel-font-thin track">{text}</div>;
};

interface DuckProfileProps {
  duck: DuckData;
}
const DuckProfileView: FC<DuckProfileProps> = ({ duck }) => {
  const profile = useDuckProfile(duck.id);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0' }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.20 }}
      className="h-full p-2 absolute bg-black w-full"
    >
      <div className="h-full overflow-scroll relative">
        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <img
                className="border-2 border-white rounded-full"
                alt={`Duck ${duck.id}`}
                src={`data:image/webp;base64,${duck.webp}`}
              />
            </div>

            <div className="flex items-start flex-col justify-end gap-2 ">
              <div className="p-1">
                <FieldLabel text="Duck ID" />
                <Field text={padStart(duck.id, 3, '0')} />
              </div>
              <div className="bg-white bg-opacity-10 w-full p-1">
                <FieldLabel text="Duck Type" />
                <Field text={duck.isCustom ? 'Custom' : 'Tozzi'} />
              </div>
              <div className="p-1">
                <FieldLabel text="Hatched" />
                <Field text={(new Date(duck.hatched).toLocaleDateString())} />
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white flex  items-center space-x-4 bg-opacity-10 p-1">
            <FieldLabel text="Name" />
            <Field text={profile?.name ?? `Duck ${duck.id}`} />
          </div>
          <div className="col-span-2 p-1 flex  items-center space-x-4">
            <FieldLabel text="Status" />
            <Field text={profile?.status ?? 'N/A'} />
          </div>
          <div className="col-span-2 bg-white bg-opacity-10 p-1">
            <FieldLabel text="Profile" />
            <Field text={profile?.description ?? 'N/A - Please contact machine owner to configure your profile.'} />
          </div>
          <div className="flex gap-2">
            <div className="p-1 flex-1">
              <FieldLabel text="Owner" />
              <Field text={shortenAddress(duck.owner)} />
            </div>

            <div className=" p-1 flex-1">
              <FieldLabel text="Creator" />
              <Field text={profile?.creator ?? 'N/A'} />
            </div>
          </div>
          <div className="col-span-2 p-1 bg-white bg-opacity-10 ">
            <FieldLabel text="Duck Complexity" />
            <Field text={profile?.complexity ?? 'N/A'} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DuckProfile: FC<{duck: DuckData, show: boolean}> = ({ duck, show }) => {
  return (
    <AnimatePresence>
      { show && <DuckProfileView duck={duck} /> }
    </AnimatePresence>
  );
};

export default DuckProfile;
