export type OperatingSystem = 'macOS' | 'iOS' | 'Windows' | 'Linux' | 'Android';

export type DesktopOperatingSystem = Exclude<OperatingSystem, 'iOS' | 'Android'>;
