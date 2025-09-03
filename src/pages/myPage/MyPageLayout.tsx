import { ReactNode } from "react";
import { Container } from "./MyPage.styled";

interface Props {
  children: ReactNode;
}

export default function MyPageLayout({ children }: Props) {
  return <Container>{children}</Container>;
}
