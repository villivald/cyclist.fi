import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailTemplateProps = {
  message: string;
  fromEmail: string;
  name: string;
};

const EmailTemplate = ({ message, fromEmail, name }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-8 font-sans">
          <Container>
            <Section>
              <Text>{message}</Text>
            </Section>

            <Hr />
            <Section>
              <Text className="text-sm text-gray-500">
                Name: {name}
                <br />
                Email: {fromEmail}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailTemplate.PreviewProps = {
  message:
    "Hello, world! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non augue in justo faucibus semper at vel tellus. Integer vitae dui sed metus vestibulum faucibus eu eu felis. Fusce convallis risus non nulla vehicula ultricies. Nulla arcu lacus, dictum a neque eu, lacinia pretium tellus. Aliquam erat volutpat. Suspendisse posuere magna sagittis blandit facilisis. Aenean velit nibh, elementum vel placerat non, placerat a magna. Fusce blandit id orci nec interdum. Vivamus in pharetra nisi, ac aliquam justo. Curabitur venenatis imperdiet nulla sit amet sagittis. ",
  fromEmail: "john.doe@example.com",
  name: "John Doe",
};

export default EmailTemplate;
