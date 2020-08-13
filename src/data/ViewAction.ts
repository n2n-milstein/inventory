interface SimpleAction {
  icon: string;
  desc: string;
  emit: string;
  disabled?: boolean;
}

interface ViewAction extends SimpleAction {
  menu?: SimpleAction[];
  loading?: () => boolean;
}

export default ViewAction;
