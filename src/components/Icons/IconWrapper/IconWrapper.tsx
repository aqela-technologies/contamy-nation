import { IconButton } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    backgroundColor: "gray",
  },
});

export default IconWrapper;
