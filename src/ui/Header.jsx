import styled from "styled-components";
import HaederMenu from "../ui/HaederMenu";

import UserAvatar from "../features/authentication/UserAvatar";
const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyleHeader>
      <UserAvatar />
      <HaederMenu />
    </StyleHeader>
  );
}

export default Header;
