import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { ButtonLink } from '~/components/ui/button-link';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { getErrorResponse } from '~/shared/http';

export function loader() {
  try {
    return json({ sizes: [4, 6, 8, 10, 12] });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export default function Route() {
  const { sizes } = useLoaderData<typeof loader>();

  return (
    <Menu>
      <MenuGroup>
        {sizes.map((size) => (
          <MenuItem key={size}>
            <ButtonLink prefetch='render' to={`/game/new/${size}`} variant='secondary'>
              {size}
            </ButtonLink>
          </MenuItem>
        ))}
      </MenuGroup>
    </Menu>
  );
}
