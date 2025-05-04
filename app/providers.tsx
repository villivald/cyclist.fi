import { ThemeProvider as BaseThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <BaseThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      {children}
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
