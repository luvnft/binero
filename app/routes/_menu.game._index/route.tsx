import { json } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';

import { Layout } from '~/components/ui/layout';
import { LayoutContent } from '~/components/ui/layout-content';
import { LayoutHeader } from '~/components/ui/layout-header';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuLinkItem } from '~/components/ui/menu-link-item';
import { expectNotToBeNaN } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';

import { useMatchParams } from './hooks';

export function loader() {
  try {
    return json({ sizes: [4, 6, 8, 10, 12] });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export default function Route() {
  const { sizes } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const matchParams = useMatchParams('/game/new/:size', navigation.location?.pathname);
  const matchParamsSize = matchParams === null ? null : expectNotToBeNaN(Number(matchParams.size));

  return (
    <Layout>
      <LayoutHeader />
      <LayoutContent>
        <Menu>
          <MenuGroup>
            {sizes.map((size) => (
              <MenuLinkItem key={size} loading={size === matchParamsSize} to={`/game/new/${size}`} variant='secondary'>
                {size}
              </MenuLinkItem>
            ))}
          </MenuGroup>
        </Menu>
      </LayoutContent>
    </Layout>
  );
}
