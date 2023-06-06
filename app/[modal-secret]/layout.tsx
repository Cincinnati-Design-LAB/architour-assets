import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { 'modal-secret': string };
};

export default async function ModalLayout(props: Props) {
  if (
    !process.env.UPLOAD_ACCESS_TOKEN ||
    !process.env.UPLOAD_ACCESS_TOKEN.length ||
    props.params['modal-secret'] !== process.env.UPLOAD_ACCESS_TOKEN
  ) {
    return notFound();
  }

  return <>{props.children}</>;
}
