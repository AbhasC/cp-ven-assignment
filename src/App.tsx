import { DNASection } from "./components/DNASection";
import { HeroLander } from "./components/HeroLander";
import { Breakthrough } from "./components/Breakthrough";
import { HowItWorks } from "./components/HowItWorks";
import { Proofs } from "./components/Proofs";
import { Capabilities } from "./components/Capabilities";
import { Impact } from "./components/Impact";
import { Questions } from "./components/Questions";
import { FinalSection } from "./components/FinalSection";
import { CustomCursor } from "./common-components/CustomCursor";
import { ThemeButton } from "./common-components/ThemeButton";
import { InfiniteScroller } from "./common-components/InfiniteScroller";
import { ScrollPosViewer } from "./common-components/ScrollPosViewer";
import { TouchDeviceModal } from "./common-components/TouchDeviceModal";

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollPosViewer />
      <TouchDeviceModal />
      <div className="w-full bg-bg z-0 relative" id="main">
        <ThemeButton />
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50 blur-[3px]">
          <DNASection />
        </div>
        <div className="w-full max-w-[1800px] mx-auto">
          <InfiniteScroller
            topClone={<FinalSection isDummy={true} />}
            bottomClone={<HeroLander isDummy={true} />}
          >
            <>
              <HeroLander />
              <Breakthrough />
              <HowItWorks />
              <Proofs />
              <Capabilities />
              <Impact />
              <Questions />
              <FinalSection />
            </>
          </InfiniteScroller>
        </div>
      </div>
    </>
  );
}

export default App;
