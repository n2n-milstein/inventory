interface SimpleAction {
  icon: string;
  desc: string;
  emit: string;
}

interface ViewAction extends SimpleAction {
  menu?: SimpleAction[];
}

export default ViewAction;
