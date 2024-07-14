export interface ScrollItemProps {
  title: string;
  focused?: boolean;
}

export const ScrollItem = (props: ScrollItemProps) => {
  const { title, focused = false } = props;
  return (
    <div className="scroll-item" data-focused={focused}>
      <h1>{title}</h1>
    </div>
  );
};
