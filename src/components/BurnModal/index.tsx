import { Html } from "@react-three/drei";
import useMachineStore from "../../store";
import { aspectRatio, minViewLength } from "../../utils/constants";
import { burnRenegadeDuck } from "../../utils/interact";
import { useThree } from "react-three-fiber";
import { useRef } from "react";
import "./index.scss";

const BurnModal: (props: any) => JSX.Element = (props: any) => {
  const currentAdminDuckId = useMachineStore(
    (state) => state.currentAdminDuckId
  );
  const setCurrentAdminDuckId = useMachineStore(
    (state) => state.setCurrentAdminDuckId
  );
  const setProcessing = useMachineStore((state) => state.setProcessing);
  const { viewport } = useThree();
  // const min = Math.min(viewport.width, viewport.height);
const min = viewport.width;
  const setTransactionStatus = useMachineStore(
    (state) => state.setTransactionStatus
  );
  const setShowTxStatus = useMachineStore((state) => state.setShowTxStatus);
  const customDuckData = useMachineStore((state) => state.customDuckData);
  const setCustomDuckData = useMachineStore((state) => state.setCustomDuckData);
  const reasonRef = useRef<any>(null);

  return (
    <Html
      scale={[
        (0.3 * min) / minViewLength,
        (0.2 * min) / minViewLength,
        (1 * min) / minViewLength,
      ]}
      position={[0, 0, 0.2]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      {props.openModal && (
        <div className="BurnModal">
          <div className="_close" onClick={props.onCloseModal}></div>
          <div className="_container">
            <textarea className="_reason" ref={reasonRef} rows={5}></textarea>
            <div
              className="_btn-burn"
              onClick={async () => {
                if (currentAdminDuckId < 0) return;
                if (!reasonRef.current.value) {
                  reasonRef.current.focus();
                  return;
                }
                setProcessing(true);
                setTransactionStatus("processing...");
                // setShowTxStatus(true);
                const res = await burnRenegadeDuck({
                  duckId: currentAdminDuckId,
                  reason: reasonRef.current.value,
                });                
                if (res.success) {
                  // remove burned duck data.
                  const filterCustomDuckData = customDuckData.filter(
                    (e) => e.id !== currentAdminDuckId
                  );
                  setCustomDuckData(filterCustomDuckData);
                  setCurrentAdminDuckId(
                    filterCustomDuckData.length
                      ? filterCustomDuckData[0].id
                      : -1
                  );
                }
                setTransactionStatus(res.status);
                setProcessing(false);
                props.onCloseModal();
              }}
            >
              Burn
            </div>
          </div>
        </div>
      )}
    </Html>
  );
};

export default BurnModal;
