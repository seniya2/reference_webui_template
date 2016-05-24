package reference_webui_template.organization;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Position {

	@GeneratedValue
	@Id
	public Long id;
	
	public String name;
	public String date;
	public String description;
	
}
