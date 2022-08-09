/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { padStart } from 'lodash';
import { shortenAddress, useEthers } from '@usedapp/core';
// eslint-disable-next-line import/no-relative-packages
import { motion, AnimatePresence } from '../../../../node_modules/framer-motion/dist/framer-motion';
import { DuckData } from '../../../types/types';
import { getMetadataAttribute } from '../../../utils/helpers';
import { useEnsOrShort } from '../../../hooks';
import useMachineStore from '../../../store';
import { OpenseaIcon } from '../../common/SvgIcon';
import { openseaDuckUrl } from '../../../utils/constants';

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
  const { metadata } = duck;
  const { showProfileForm, setShowProfileForm, account } = useMachineStore();
  const { name, description } = metadata!;
  const status = getMetadataAttribute(metadata, 'Status');
  const title = getMetadataAttribute(metadata, 'Title');
  const creator = getMetadataAttribute(metadata, 'Creator');
  const formattedCreator = creator === 'Jim Tozzi'
    ? creator
    : useEnsOrShort(creator);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0' }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.20 }}
      className="h-full p-2 absolute bg-black w-full select-none"
    >
      <div className="h-full overflow-scroll relative">
        <div className="p-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex-1 relative bg-white bg-opacity-10 rounded-lg">
              <a target="_blank" href={`${openseaDuckUrl}${duck.id}`} rel="noreferrer">
                <OpenseaIcon className="fill-white absolute w-8 h-8 bottom-2 left-2" />
              </a>
              <img
                className="border-2"
                alt={`Duck ${duck.id}`}
                src={duck.isCustom ? duck.webp : `data:image/webp;base64,${duck.webp}`}
              />
              { account === duck.owner && (
                <div
                  onClick={() => setShowProfileForm(!showProfileForm)}
                  className="absolute bottom-2 right-2 z-30 px-2 pt-1 text-sm text-white bg-orange-500 border-2 border-white rounded-lg pixel-font cursor-pointer"
                >
                  { showProfileForm ? 'CANCEL' : 'EDIT' }
                </div>
              )}
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
          <div className="col-span-2 bg-white bg-opacity-10 pt-2 px-2">
            <FieldLabel text="Name" />
            <Field text={name || `Duck ${duck.id}`} />
          </div>
          <div className="flex col-span-2 bg-opacity-10 pt-2 px-2">
            <div className="flex-1">
              <FieldLabel text="Status" />
              <Field text={status || 'N/A'} />
            </div>
            { title && (
              <div className="flex-1">
                <FieldLabel text="Title" />
                <Field text={title} />
              </div>
            )}
          </div>

          <div className="col-span-2 bg-white bg-opacity-10 pt-2 px-2">
            <FieldLabel text="Description" />
            <Field text={description || 'N/A - Please contact machine owner to configure your profile.'} />
          </div>

          <div className="flex gap-2">
            <div className="p-1 flex-1">
              <FieldLabel text="Owner" />
              <Field text={shortenAddress(duck.owner)} />
            </div>

            <div className=" p-1 flex-1">
              <FieldLabel text="Creator" />
              <Field text={formattedCreator || shortenAddress(creator || '') || '--'} />
            </div>
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
