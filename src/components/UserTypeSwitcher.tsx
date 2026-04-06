import { useState } from 'react';

import { ChevronDown, Stethoscope, UserCircle } from 'lucide-react';

interface UserTypeSwitcherProps {
  userType: string;
  onUserTypeChange: (userType: string) => void;
}

const UserTypeSwitcher = ({ userType, onUserTypeChange }: UserTypeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);


  const userTypes = [
    { id: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Medical Professional' },
    { id: 'non_doctor', label: 'Patient', icon: UserCircle, description: 'General User' },
  ];

  const currentUserType = userTypes.find(ut => ut.id === userType) || userTypes[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors border border-transparent hover:border-border/40"
      >
        <currentUserType.icon className="w-4 h-4 text-muted-foreground" />
        <span>{currentUserType.label}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border shadow-lg z-50 overflow-hidden">
            {userTypes.map((ut) => (
              <button
                key={ut.id}
                onClick={() => {
                  onUserTypeChange(ut.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-secondary/80 transition-colors ${
                  userType === ut.id ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <ut.icon className={`w-4 h-4 ${userType === ut.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <div className="text-sm font-medium">{ut.label}</div>
                  <div className="text-xs text-muted-foreground">{ut.description}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTypeSwitcher;
