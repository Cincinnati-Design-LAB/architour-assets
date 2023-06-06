import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { token: string };
};

export default async function ModalLayout(props: Props) {
  if (
    !process.env.IMAGES_ACCESS_TOKEN ||
    !process.env.IMAGES_ACCESS_TOKEN.length ||
    props.params.token !== process.env.IMAGES_ACCESS_TOKEN
  ) {
    return notFound();
  }

  return <>{props.children}</>;
}
