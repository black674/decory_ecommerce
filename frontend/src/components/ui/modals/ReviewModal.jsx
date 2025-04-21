import {
  Avatar,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import Button from "../button/Button";
import { useAuth } from "@/provider/authProvider";

export default function ReviewModal({
  isOpen,
  setIsOpen,
  title,
  setTitle,
  desc,
  setDesc,
  rating,
  setRating,
  confirmButton,
  handleSubmit,
}) {
  const { user } = useAuth();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content>
        <Dialog.Title>Make Review</Dialog.Title>
        <Dialog.Description size="2" mb="6">
          Create a new review for this product
        </Dialog.Description>

        <div className="w-full flex flex-col lg:gap-5 lg:flex-row">
          <div className="flex flex-col items-center text-xl text-black leading-[1.6]">
            <Avatar
              size="7"
              src={user?.avatar}
              alt="User avatar"
              fallback={user?.name?.slice(0, 1).toUpperCase()}
              radius="full"
            />
            <p className="mt-1.5 font-semibold text-sm">{user?.name}</p>
          </div>
          <Flex direction="column" gap="3" width="100%">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Rating
              </Text>
              <TextField.Root
                type="number"
                min="1"
                max="5"
                placeholder="Enter your full name"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                className="!w-full"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                placeholder="Enter review title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="!w-full"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                placeholder="Enter review description"
                rows="5"
                className="!w-full"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </label>
          </Flex>
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" className="!px-2 !py-1">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit} className="!px-3 !py-1">
              {confirmButton || "submit"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
