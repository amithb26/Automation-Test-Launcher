package entities;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TBMapBody {
    @XmlElement String testbed;
    @XmlElement String state;

}
