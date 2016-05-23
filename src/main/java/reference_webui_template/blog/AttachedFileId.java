package reference_webui_template.blog;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Embeddable
public class AttachedFileId implements Serializable {

	public Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	public Blog blog;

	@Override
	public String toString() {
		return "AttachedFileId [id=" + id + "]";
	}
	
}
