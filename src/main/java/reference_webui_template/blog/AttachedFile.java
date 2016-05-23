package reference_webui_template.blog;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class AttachedFile {

	
	@EmbeddedId
	public AttachedFileId id;
	
	public String path;

	@Override
	public String toString() {
		return "AttachedFile [id=" + id + ", path=" + path + "]";
	}
	
	
}
