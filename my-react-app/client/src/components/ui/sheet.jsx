export const Sheet = ({ children, open, onOpenChange }) => (
  <div>{children}</div>
);

export const SheetTrigger = ({ children, asChild, ...props }) => (
  <div {...props}>{children}</div>
);

export const SheetContent = ({ children, side, ...props }) => (
  <div {...props}>{children}</div>
);
