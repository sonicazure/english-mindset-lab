import EmergencyPhrases from '@/sections/EmergencyPhrases';
import SelfIntroScripts from '@/sections/SelfIntroScripts';
import DailyPhrase from '@/sections/DailyPhrase';

export default function TabToolbox() {
  return (
    <div>
      <DailyPhrase />
      <EmergencyPhrases />
      <SelfIntroScripts />
    </div>
  );
}
